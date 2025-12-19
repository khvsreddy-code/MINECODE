from PIL import Image

def remove_white_bg(input_path, output_path, threshold=240):
    print(f"I am processing: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    
    for item in data:
        # Check if the pixel is bright green (Green Screen)
        # Green is usually (0, 255, 0) approx
        # Detect if Green is high and Red/Blue are low
        if item[1] > 200 and item[0] < 100 and item[2] < 100:
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to: {output_path}")

    import sys
    if len(sys.argv) > 2:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        remove_white_bg(input_file, output_file)
    else:
        print("Usage: python remove_bg.py <input> <output>")
