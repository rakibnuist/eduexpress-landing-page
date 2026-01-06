#!/bin/bash

# PDF Generator Script for Meta Marketing Plan
# This script generates a PDF from the print_plan.html page

# Configuration
URL="http://localhost:8080/print_plan.html"
OUTPUT_FILE="$HOME/Desktop/META_COMPLETE_GUIDE.pdf"

# Check if Chrome is installed
if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif [ -x "/Applications/Chromium.app/Contents/MacOS/Chromium" ]; then
    CHROME="/Applications/Chromium.app/Contents/MacOS/Chromium"
else
    echo "Error: Chrome or Chromium not found."
    echo "Please install Google Chrome or Chromium."
    exit 1
fi

echo "🚀 Generating PDF from: $URL"
echo "📄 Output file: $OUTPUT_FILE"

# Generate PDF using Chrome headless
"$CHROME" --headless --disable-gpu --print-to-pdf="$OUTPUT_FILE" "$URL"

# Check if PDF was created successfully
if [ -f "$OUTPUT_FILE" ]; then
    echo "✅ PDF generated successfully!"
    echo "📍 Location: $OUTPUT_FILE"
    
    # Open the PDF automatically
    open "$OUTPUT_FILE"
else
    echo "❌ PDF generation failed."
    exit 1
fi
