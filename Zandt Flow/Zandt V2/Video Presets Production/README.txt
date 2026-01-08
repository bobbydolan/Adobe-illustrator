VIDEO PRESETS PRODUCTION SCRIPTS
============================

This package contains two scripts for automating the generation of image and video assets from video files:
1. Image_Asset_Generation.jsx (for Adobe Photoshop)
2. Video_Asset_Generation.jsx (for Adobe After Effects)

WHAT THESE SCRIPTS DO
--------------------

Image_Asset_Generation.jsx:
- Takes video files from the Input folder
- Places them into a PSD template
- Scales videos to 1200px height and centers them in the canvas
- Saves PNG images at two sizes: 1200x1200px square and 300x300px square
- Formats filenames with "Before_After_" prefix and proper capitalization

Video_Asset_Generation.jsx:
- Replaces FPO (For Position Only) footage in a template with videos from the Input folder
- Renders videos as MP4 at two sizes: 1200x1200px square and 300x300px square
- Formats filenames with "Before_After_" prefix and proper capitalization

PREREQUISITES
------------

- Adobe Photoshop CC or later (for Image_Asset_Generation.jsx)
- Adobe After Effects CC or later (for Video_Asset_Generation.jsx)
- Video files in supported formats (.mp4, .mov, .avi, etc.)
- Proper folder structure (see below)

FOLDER STRUCTURE
--------------

The scripts expect the following folder structure:

Video Presets Production/
├── Scripts/
│   ├── Image_Asset_Generation.jsx
│   └── Video_Asset_Generation.jsx
├── Video Presets Assets/
│   ├── Input/
│   │   └── [your video files go here]
│   ├── Output/
│   │   └── [generated files will appear here]
│   └── _Template/
│       ├── Video Presets Image Assets Template.psd
│       └── Video Presets Video Assets Template.aep

HOW TO USE IMAGE_ASSET_GENERATION.JSX
-----------------------------------

STEP 1: SETUP
- Place your video files (.mp4, .mov, .avi) in the "Video Presets Assets/Input" folder
- Ensure the template PSD file exists at "Video Presets Assets/_Template/Video Presets Image Assets Template.psd"

STEP 2: RUNNING THE SCRIPT
- Open Adobe Photoshop
- Go to File > Scripts > Browse...
- Navigate to and select "Scripts/Image_Asset_Generation.jsx"
- Click Open

STEP 3: PROCESSING
- The script will open the template PSD
- For each video in the Input folder, it will:
  * Place the video as a smart object
  * Scale it to 1200px height and center it
  * Save PNG images at 1200x1200px square and 300x300px square
- Output files will be saved to the Output folder with names like:
  * Before_After_Video_Name_1200.png
  * Before_After_Video_Name_300.png

HOW TO USE VIDEO_ASSET_GENERATION.JSX
-----------------------------------

STEP 1: SETUP
- Place your video files (.mp4, .mov, .avi, etc.) in the "Video Presets Assets/Input" folder
- Ensure the template AEP file exists at "Video Presets Assets/_Template/Video Presets Video Assets Template.aep"

STEP 2: RUNNING THE SCRIPT
- Open Adobe After Effects
- Open the template project file ("Video Presets Video Assets Template.aep")
- Go to File > Scripts > Run Script File...
- Navigate to and select "Scripts/Video_Asset_Generation.jsx"
- Click Open

STEP 3: PROCESSING
- A progress window will appear showing the processing status
- For each video in the Input folder, the script will:
  * Replace the FPO footage in the template with your video
  * Scale the video to fit within a 1:1 aspect ratio at 1200x1200 pixels
  * Render MP4 videos at 1200x1200 and 300x300 sizes
- Output files will be saved to the Output folder with names like:
  * Before_After_Video_Name_1200.mp4
  * Before_After_Video_Name_300.mp4

FILE NAMING CONVENTIONS
---------------------

Both scripts automatically clean and format filenames:
- Spaces are replaced with underscores
- Parentheses and special characters are removed
- First letter of each word is capitalized
- "Before_After_" prefix is added
- Size suffix (_1200 or _300) is appended

Example:
  Original filename: "my video (1).mp4"
  Output filenames from Image_Asset_Generation.jsx:
    - "Before_After_My_Video_1200.png"
    - "Before_After_My_Video_300.png"
  Output filenames from Video_Asset_Generation.jsx:
    - "Before_After_My_Video_1200.mp4"
    - "Before_After_My_Video_300.mp4"

TROUBLESHOOTING
-------------

COMMON ISSUES:

1. FILES NOT FOUND
   - Check that your folder structure matches the expected structure
   - Verify that the Input folder contains video files

2. TEMPLATE NOT FOUND
   - Ensure the template files exist in the correct location:
     * Video Presets Assets/_Template/Video Presets Image Assets Template.psd
     * Video Presets Assets/_Template/Video Presets Video Assets Template.aep

3. NO OUTPUT GENERATED
   - Verify that your input videos are in a supported format
   - Check that you have write permissions to the Output folder

4. SCRIPT ERRORS
   - Check the ExtendScript console for error messages
   - For Photoshop: Window > Extensions > ExtendScript Toolkit
   - For After Effects: Window > Extensions > ExtendScript Toolkit

ADDITIONAL NOTES
--------------

- The scripts automatically disable audio in the output videos
- For best results, use high-quality video files as input
- The scripts are designed to maintain aspect ratio while scaling to the target dimensions
- The Image_Asset_Generation.jsx script now creates square outputs at both sizes (1200x1200px and 300x300px)
- The Video_Asset_Generation.jsx script creates square videos at both sizes (1200x1200px and 300x300px)
- Both scripts use the same naming conventions for consistency across outputs
