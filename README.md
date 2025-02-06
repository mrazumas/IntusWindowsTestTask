# Intus Windows Test Task
Configuration instructions:
The program should not require much configuration. Simply run it in Visual Studio.

Operating instructions:
Once the program is started and the website opens, a SVG rectangle will apear, it's dimensions will automaticly load from previous interactions.
The user can resize the rectangle by clicking and dragging the red circle on the bottom right.
Once the user is satisfied with the result of the resizing, upon releasing the mouse button, the new dimensions will be saved to file. 
After 10 seconds, the server will return a message : either OK and the validation is successful (printed to console), or an error will pop up (alert box), informing the user that the rectangles width is larger than its height. Either way, the new dimensions will be saved to file.

Troubleshooting instructions:
In case there are errors with the program, it is most likely that the port used by the program by default was in-use on the users device. In such case, the user should change the port for the API to one that was selected by the program. This can be done by refactoring the the App.jsx file, where it calls the API.
