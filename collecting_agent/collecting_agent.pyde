from Vehicle import Vehicle
from Food import Food

def setup():
    global vehicle
    global food
    size(640, 360)
    velocity = PVector(0, 0)
    food = Food(width / 3, height / 3, velocity)
    vehicle = Vehicle(width / 2, height / 2, velocity)

def draw():
    background(255)
    mouse = PVector(mouseX, mouseY)
    food.update()
    food.display()
    vehicle.update()
    vehicle.display()
