import subprocess
import json

def parse_non_json_part(output):
    # Parse non-JSON part using start and end indices of double quotes
    non_json_start_index = output.find('"')
    non_json_end_index = output.rfind('"')
    if non_json_start_index != -1 and non_json_end_index != -1:
        non_json_part = output[non_json_start_index:non_json_end_index + 1]  # Include the quotes
        return non_json_part.strip()
    else:
        print("No non-JSON part found in the output.")
        return ''

def parse_json_part(json_part):
    # Remove content within double quotes from JSON part
    json_output = ''
    non_json_output = ''
    within_quotes = False
    for char in json_part:
        if char == '"':
            within_quotes = not within_quotes
        if not within_quotes:
            json_output += char
        else:
            non_json_output += char
    return json_output.strip(), non_json_output.strip()

def run_command_and_parse_output(command):
    # Run the command
    result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    # Get the standard output
    output = result.stdout

    # Initialize variables to hold JSON and non-JSON parts
    json_output = None
    non_json_output = ''

    # Find JSON part
    json_start_index = output.find('[')
    json_end_index = output.rfind(']')
    if json_start_index != -1 and json_end_index != -1:
        json_part = output[json_start_index:json_end_index + 1]
        json_output, non_json_output = parse_json_part(json_part)
        # Ensure JSON part ends with `}]`
        json_output = json_output.replace('}, "', '}]')
    else:
        print("No JSON part found in the output.")

    # Parse non-JSON part
    non_json_output += parse_non_json_part(output)

    return json_output, non_json_output

# Example usage
command = "pros c get-branchline-template-versions okapilib"
json_output, non_json_output = run_command_and_parse_output(command)

print("JSON Part:", json_output)
print("Non-JSON Part:", non_json_output)
