# The Nature of Code
# Daniel Shiffman
# http://natureofcode.com
#
# Modified by  Equipe 3 - Moisés, Ricardo and Reydne

from Vehicle import Vehicle
from Food import Food

debug = True
d = 25
count_food = 0

def setup():
    global vehicle, food
    size(640, 360)
    velocity = PVector(0, 0)
    velocityFood = PVector(0, 0)
    vehicle = Vehicle(width / 2, height / 2, velocity)
    food = Food(random(width), random(height))

def draw():
    global count_food
    count_food += food.update(vehicle)
    
    #Draw the environment
    background(255)
    if debug:
        stroke(250)
        noFill()
        rectMode(CENTER)
        rect(width / 2, height / 2, width - d * 2, height - d * 2)
    
    #To write text in environment
    textSize(16)
    textAlign(RIGHT)
    text("Food: " + str(count_food), 70, 20)
  
    #Update class
    vehicle.update()
    vehicle.display()
    food.display()
    vehicle.seek(food.position)

    
