# The Nature of Code
# Daniel Shiffman
# http://natureofcode.com
#
# Modified by Equipe 3

# Draws a "vehicle" on the screen

# Implements Craig Reynold's autonomous steering behaviors
# One vehicle "seeks"
# See: http://www.red3d.com/cwr/

from Vehicle import Vehicle
from Food import Food

def setup():
    global vehicle, food
    size(640, 360)
    velocity = PVector(0, 0)
    velocityFood = PVector(0, 0)
    vehicle = Vehicle(width / 2, height / 2, velocity)
    food = Food(random(width), random(height), velocityFood)

def draw():
    background(255)
    #mouse = PVector(mouseX, mouseY)
    vehicle.update()
    vehicle.display()
    food.update()
    food.display()

def keyTyped():
    print(key)
    if key == 'a':
        vehicle.applyForce(PVector(-1, 0))
    elif key == 'd':
        vehicle.applyForce(PVector(1, 0))
    elif key == 'w':
        vehicle.applyForce(PVector(0, -1))
    elif key == 's':
        vehicle.applyForce(PVector(0, 1))

def keyReleased():
    vehicle.velocity = PVector(0, 0)
    
#def count():
    
