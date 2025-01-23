///|
struct Config {
  x1 : @complex.Complex
  x2 : @complex.Complex
  max_iterations : Int
  width : Int
  height : Int
}

///|
fn diff(self : Config) -> @complex.Complex {
  self.x2 - self.x1
}

///|
fn dx(self : Config) -> Double {
  self.diff().real / self.width.to_double()
}

///|
fn dy(self : Config) -> Double {
  self.diff().imag / self.height.to_double()
}

///|
let config : Ref[Config] = {
  val: {
    x1: @complex.Complex::new(-2.0, 1.0),
    x2: @complex.Complex::new(1.0, -1.0),
    max_iterations: 5000,
    width: 640,
    height: 400,
  },
}

///| define 16 grayscale colors in an array
let colors = [
  "rgb(0 0 0)", "rgb(16 16 16)", "rgb(32 32 32)", "rgb(48 48 48)", "rgb(64 64 64)",
  "rgb(80 80 80)", "rgb(96 96 96)", "rgb(112 112 112)", "rgb(128 128 128)", "rgb(144 144 144)",
  "rgb(160 160 160)", "rgb(176 176 176)", "rgb(192 192 192)", "rgb(208 208 208)",
  "rgb(224 224 224)", "rgb(240 240 240)", "rgb(255 255 255)",
]

///|
pub fn draw(canvas : @canvas.Canvas2D) -> Unit {
  mandelbrot(canvas)
}

pub fn click(canvas : @canvas.Canvas2D, event: @canvas.MouseEvent) -> Unit {
    let xpos = event.offset_x()
      let ypos = event.offset_y()
      let dx = config.val.dx()
      let dy = config.val.dy()
      let newX1 = @complex.Complex::new(
        config.val.x1.real + xpos * dx - 80.0 * dx,
        config.val.x1.imag + ypos * dy - 50.0 * dy,
      )
      let newX2 = @complex.Complex::new(
        newX1.real + 160.0 * dx,
        newX1.imag + 100.0 * dy,
      )
      config.val = { ..config.val, x1: newX1, x2: newX2 }
      mandelbrot(canvas)
}


///|
fn mandelbrot(canvas : @canvas.Canvas2D) -> Unit {
  let x1 = config.val.x1
  let dx = config.val.dx()
  let dy = config.val.dy()
  for cx = 0.0; cx < config.val.width.to_double(); cx = cx + 1.0 {
    for cy = 0.0; cy < config.val.height.to_double(); cy = cy + 1.0 {
      let dc = @complex.Complex::new(cx * dx, cy * dy)
      let c = x1 + dc
      let color = iterate(c, config.val.max_iterations)
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
