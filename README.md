# Quiz Website System

A simple, interactive quiz website that allows users to upload JSON files containing quiz questions and track their progress.

## Features

- ✅ Upload custom quiz questions via JSON file
- ✅ Load sample quiz for quick testing
- ✅ Real-time progress bar showing completion status
- ✅ Score calculation and percentage display
- ✅ Detailed review of mistakes with correct answers
- ✅ Clean, responsive design
- ✅ GitHub Pages compatible

## Demo

Visit the live demo: [Quiz Website](https://monaliza14xx.github.io/quiz/)

## Usage

### 1. Load a Quiz

You can either:
- **Upload a JSON file**: Click the file input and select your quiz JSON file
- **Load Sample Quiz**: Click the "Load Sample Quiz" button to try the default quiz

### 2. Answer Questions

- Read each question carefully
- Click on your chosen answer
- Click "Next Question" to proceed (or "Submit Quiz" for the last question)
- Track your progress with the progress bar at the top

### 3. Review Results

After completing the quiz, you'll see:
- Your total score
- Percentage achieved
- A detailed list of any mistakes with correct answers

### 4. Start Over

Click "Start New Quiz" to begin again with a new quiz file

## JSON Format

Your quiz JSON file should follow this structure:

```json
{
    "title": "Your Quiz Title",
    "questions": [
        {
            "question": "What is the capital of France?",
            "choices": ["London", "Berlin", "Paris", "Madrid"],
            "correctAnswer": 2
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "choices": ["Venus", "Mars", "Jupiter", "Saturn"],
            "correctAnswer": 1
        }
    ]
}
```

**Notes:**
- `correctAnswer` is the index (0-based) of the correct choice in the `choices` array
- Each question must have at least 2 choices
- All fields are required

## Example Quiz

Check out `sample-quiz.json` for a complete example.

## Local Development

1. Clone this repository:
```bash
git clone https://github.com/Monaliza14xx/quiz.git
cd quiz
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select the main/master branch
4. Click Save

Your quiz will be live at: `https://yourusername.github.io/quiz/`

## Technologies Used

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (no dependencies)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Contributing

Feel free to open issues or submit pull requests for improvements!

## License

MIT License - feel free to use this project for your own purposes.