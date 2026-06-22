import { useEffect, useRef } from 'react'

import { useReducedMotion } from '@/hooks/use-ui'

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;

float hexDist(vec2 p) {
  p = abs(p);
  float c = dot(p, normalize(vec2(1.0, 1.73)));
  c = max(c, p.x);
  return c;
}

vec4 hexCoords(vec2 uv) {
  vec2 r = vec2(1.0, 1.73);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;
  float x = atan(gv.x, gv.y);
  float y = 0.5 - hexDist(gv);
  vec2 id = uv - gv;
  return vec4(x, y, id.x, id.y);
}

void main() {
  vec2 uv = (v_texCoord - 0.5) * 2.0;
  uv.x *= u_resolution.x / u_resolution.y;
  uv *= 5.0;
  uv += vec2(u_scroll * 0.0004, u_scroll * 0.0002);

  float t = u_time * 0.5;
  vec4 hc = hexCoords(uv + t * 0.1);

  vec3 baseColor = vec3(0.06, 0.07, 0.12);
  vec3 accentColor = vec3(0.84, 0.19, 0.19);

  float edge = smoothstep(0.0, 0.1, hc.y);
  float grid = smoothstep(0.02, 0.0, hc.y);

  float pulse = sin(hc.z * 0.5 + hc.w * 0.8 + t) * 0.5 + 0.5;
  vec3 color = mix(baseColor, accentColor * 0.4, pulse * edge);
  color += grid * accentColor * 0.5;

  vec2 m = (u_mouse / u_resolution - 0.5) * 2.0;
  m.x *= u_resolution.x / u_resolution.y;
  float mouseGlow = smoothstep(2.0, 0.0, length(uv - m * 5.0));
  color += accentColor * mouseGlow * 0.2;

  gl_FragColor = vec4(color, 1.0);
}
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

type HexPulseCanvasProps = {
  className?: string
}

export function HexPulseCanvas({ className }: HexPulseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (e.clientX - rect.left) / rect.width
      const ny = 1.0 - (e.clientY - rect.top) / rect.height
      mouseRef.current = {
        x: nx * canvas.width,
        y: ny * canvas.height,
      }
    }
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl', { alpha: false, antialias: false }) ??
      canvas.getContext('experimental-webgl', {
        alpha: false,
        antialias: false,
      })) as WebGLRenderingContext | null
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uScroll = gl.getUniformLocation(program, 'u_scroll')

    let animationId = 0
    let visible = !document.hidden

    const syncSize = () => {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, canvas.width, canvas.height)
        mouseRef.current = {
          x: canvas.width / 2,
          y: canvas.height / 2,
        }
      }
    }

    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)
    syncSize()

    const render = (time: number) => {
      if (!visible) return
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, time * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uMouse) {
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      }
      if (uScroll) gl.uniform1f(uScroll, scrollRef.current)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!reducedMotion) {
        animationId = requestAnimationFrame(render)
      }
    }

    const onVisibility = () => {
      visible = !document.hidden
      if (visible && !reducedMotion) {
        cancelAnimationFrame(animationId)
        animationId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    render(0)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
