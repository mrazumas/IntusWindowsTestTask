# Intus Windows Test Task
Configuration instructions:
The program should not require much configuration. Simply run it in Visual Studio.

Operating instructions:
Once the program is started and the website opens, a SVG rectangle will apear, it's dimensions will automaticly load from previous interactions.
The user can resize the rectangle by clicking and dragging the red circle on the bottom right.
Once the user is satisfied with the result of the resizing, upon releasing the mouse button, the new dimensions will be saved to file. 
After 10 seconds, the server will return a message : either OK and the validation is successful (printed to console), or an error will pop up (alert box), informing the user that the rectangles width is larger than its height. Either way, the new dimensions will be saved to file.
