///|
struct Config {
  x1 : @complex.Complex
  x2 : @complex.Complex
  max_iterations : Int
  width : Double
  height : Double
}

///|
fn diff(self : Config) -> @complex.Complex {
  self.x2 - self.x1
}

///|
fn dx(self : Config) -> Double {
  self.diff().real / self.width
}

///|
fn dy(self : Config) -> Double {
  self.diff().imag / self.height
}

///|
let config : Ref[Config] = {
  val: {
    x1: @complex.Complex::{ real: -2.0, imag: 1.0 },
    x2: @complex.Complex::{ real: 1.0, imag: -1.0 },
    max_iterations: 500,
    width: 640.0,
    height: 400.0,
  },
}

///| define 16 grayscale colors in an array
let colors = [
  "rgb(0 0 0)", 
  // generate 16 shades of grey
  "rgb(0 0 0)", "rgb(17 17 17)", "rgb(34 34 34)", "rgb(51 51 51)",
  "rgb(68 68 68)", "rgb(85 85 85)", "rgb(102 102 102)", "rgb(119 119 119)",
  "rgb(136 136 136)", "rgb(153 153 153)", "rgb(170 170 170)", "rgb(187 187 187)",
  "rgb(204 204 204)", "rgb(221 221 221)", "rgb(238 238 238)", "rgb(255 255 255)",
  ] 

///|
pub fn draw(canvas : @canvas.Canvas2D) -> Unit {
  mandelbrot(canvas)
}

///|
pub fn click(canvas : @canvas.Canvas2D, event : @canvas.MouseEvent) -> Unit {
  let (xpos, ypos) = (event.offset_x(), event.offset_y())
  let (dx, dy) = (config.val.dx(), config.val.dy())
  let (hw, hh) = (
    config.val.width / 4.0,
    config.val.height/ 4.0,
  )
  let center = @complex.Complex::{
    real: config.val.x1.real + xpos * dx,
    imag: config.val.x1.imag + ypos * dy
  }
  let offset = @complex.Complex::{ real: hw * dx, imag: hh * dy }
  let newX1 =center - offset
  let newX2 = center + offset
  config.val = { ..config.val, x1: newX1, x2: newX2 }
  mandelbrot(canvas)
}

///|
fn mandelbrot(canvas : @canvas.Canvas2D) -> Unit {
  let x1 = config.val.x1
  let (dx, dy) = (config.val.dx(), config.val.dy())
  let max_iter = config.val.max_iterations
  for cx = 0.0; cx < config.val.width; cx = cx + 1.0 {
    for cy = 0.0; cy < config.val.height; cy = cy + 1.0 {
      let dc = @complex.Complex::{ real: cx * dx, imag: cy * dy }
      let c = x1 + dc
      let color = iterate(c, max_iter)
      drawPixel(canvas, cx, cy, color)
    }
  }
}

///|
fn drawPixel(
  canvas : @canvas.Canvas2D,
  x : Double,
  y : Double,
  c : Int
) -> Unit {
  canvas.set_fill_style(@canvas.CanvasStrokeFillStyle::Color(colors[c]))
  canvas.fill_rect(x, y, 1, 1)
}

///|
fn iterate(c : @complex.Complex, max_iterations : Int) -> Int {
  let mut z : @complex.Complex = @complex.zero
  for j = 0; j < max_iterations; j = j + 1 {
    z = z * z + c
    if z.abs() >= 2.0 {
      // select a color from the array, but not black
      return j % 16 + 1
    }
  } else {
    0
  }
}
