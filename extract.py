import subprocess

def extract_files():
    # Connect to the device using adb
    subprocess.run(['adb', 'devices'])

    # Extract all files from the device
    subprocess.run(['adb', 'pull', '/', save_directory], check=True, shell=True)

# Specify the directory to save the extracted files
save_directory = 'C:\\Users\\Husain\\Desktop\\OpenMF-master\\OpenMF-master\\data'

# Call the function to start the extraction process
extract_files()
