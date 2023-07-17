const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeFile = async (filePath, inputs) => {
    
    fs.writeFileSync(path.join(outputPath, 'input.txt'), inputs, 'utf-8');
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const exec_command = `g++ ${filePath} -o ${outPath} && ${outPath} < ${path.join(outputPath, 'input.txt')}`;
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

                    // fs.rm(outputPath, { recursive: true }, (err) => {
                    //     if (err) {
                    //         console.error(err);
                    //         return;
                    //     }
                    //     console.log('Output folder removed successfully');
                    // });
                    // fs.rm(filePath, { recursive: true }, (err) => {
                    //     if (err) {
                    //         console.error(err);
                    //         return;
                    //     }
                    //     console.log('Codes folder removed successfully');
                    // });
                });
        }
        catch (err) {
            console.log("Error during execution:");
            reject(err);
        }
    });
};

module.exports = { executeFile };