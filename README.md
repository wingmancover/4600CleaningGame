# 4600CleaningGame

**Build 1**
- Scalable Canvas size


- Toilet sprite (both with and without background)


- Chemical sprites
  - **Hydrogen peroxide**: This can be used to disinfect surfaces and remove stains. 
  - **Vinegar**: This can be used to remove hard water stains and soap scum. 
  - **Baking soda**: This can be used to scrub away grime and stains. 
  - **Chlorine bleach**: This can be used to disinfect surfaces and remove stains, but it should not be used on colored surfaces or surfaces with metal parts 
  - **Barkeeps Friend**: Oxalic acid. Great at breaking down tough stains if left applied for a few minutes. Avoid porous surfaces. Good on porcelain 
  - **Draino**: Classic drain cleaner. A strong acidic mixture that shouldn’t be used often on drains because of the destructive nature of the acidic reaction. Don’t mix with other drain cleaners; potential explosion
  - Also made animation sprites for the above six chemical sprites
  

- Tools/supplies sprites
  - **Scrub Brush**
  - **Sponge**
  - **Spray**
  - **Toilet Bowl Cleaner**


- Mouse controls accessibility
  - basic object items that can be interacted with
    - Obj rotation using right-click
    - Obj scaling using mouse wheel
    - Obj click and dragging using left-click


- Rendering Images (Pushed to next build)


**Build 2**
- Collision Checker
    - Check for relative position and change the stage based on that.


-  Object Tracker
   - Tracking each object, putting objects/sprites here and giving them each name, so other classes call their names to do actions


-  WorldManager(ToiletLevel)
   - Setting up UI, the Instruction dialogue area control, the tool/chemical bar area control, the initial toilet area control


-  SceneManager
   - Dealing with each scene transition/ player interaction with game objects


-  Mouse Controls(Update)
   - Fixing issue: make rotation/scaling distinct into particular pictures

Now the basic Tank Maintenance Scene Mechanism is finished
But still needs to be polished, there are some small issues

- Assets for Tank scene
  - The current Toilet Sprite redraw: A high resolution pixel toilet (bigger toilet to fill the screen as showing on the slide)
  -   A layer for Valve
  -   A layer for Handle
  -   A layer for the Tank Lid
  -   A layer for the original Tank exterior
  -   A layer for the extra Tank interior
  -   A layer for the old flapper
  -   A new flapper
  -   A text fillable frame for instructions area
  -   An inventory bar vertically for tools/chemical and other stuffs like flappers
