const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeFile = async (filePath, inputs) => {
    inputs = [10, 20];
    // Code using to check:-
    // #include < iostream >

    // using namespace std;

    // int main()
    // {
    //     int n1, n2;
    //     cin >> n1 >> n2;
    //     for (int i = 0; i < n1; i++)
    //     cout << i << " ";
    //     cout << endl;
    //     for (int i = 0; i < n2; i++)
    //     cout << i << " ";
    //     return 0;
    // }
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    // Main command
    let exec_command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`;
    console.log(exec_command);
    // Adding input values
    inputs.forEach(inp => {
        exec_command += ` ${inp}`;
    });
    console.log(exec_command);
    return new Promise((resolve, reject) => {
        try {
            exec(
                exec_command,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log("Execution error:");
                        reject({ error, stderr });
                    }
                    if (stderr) {
                        console.log("Execution stderr:");
                        reject(stderr);
                    }
                    console.log("Execution successful. Output:" + stdout);
                    resolve(stdout);
                });
        }
        catch (err) {
            console.log("Error during execution:");
            reject(err);
        }
    });

};

module.exports = { executeFile, };