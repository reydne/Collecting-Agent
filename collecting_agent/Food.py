# The "Food" class

class Food():

    def __init__(self, x, y):
        self.position = PVector(x, y)
        self.r = 6

    # Method to update location
    def update(self, vehicle):
        # Update velocity
        if PVector.dist(self.position, vehicle.position) < (2 * self.r):
            self.position = PVector(random(width), random(height))
            return 1
        return 0

    def applyForce(self, force):
        # We could add mass here if we want A = F / M
        self.acceleration.add(force)

    def display(self):
        # Draw a triangle rotated in the direction of velocity
        #theta = self.velocity.heading()# + PI / 2
        fill(127)
        noStroke()
        strokeWeight(1)
        with pushMatrix():
            translate(self.position.x, self.position.y)
            rect(0, 0, self.r, self.r)
