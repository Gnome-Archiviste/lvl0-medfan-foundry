#!/bin/env node
import fs from 'fs';
import { spawn } from 'child_process';
import * as path from 'path';

function incrementVersion(version, type) {
    if (version.startsWith('v'))
        version = version.substring(1);
    const splitVersion = version.split('.');
    switch (type) {
        case 'patch':
            splitVersion[2] = +splitVersion[2] + 1
            break;
        case 'minor':
            splitVersion[1] = +splitVersion[1] + 1
            break;
        case 'major':
            splitVersion[0] = +splitVersion[0] + 1
            break;
    }
    return splitVersion.join('.');
}

let systemJson = fs.readFileSync('system.json').toString("utf-8");
let system = JSON.parse(systemJson);
let type = process.argv.slice(2)[0] || 'patch';
let newVersion = incrementVersion(system.version, type);
system.download = system.download.replace(system.version, newVersion);
system.version = newVersion;
fs.writeFileSync('system.json', JSON.stringify(system, null, '  '));
const gitCommit = spawn('git', ['commit', '-am', 'Update to version ' + newVersion]);
gitCommit.on('close', (data) => {
    spawn('git', ['tag', 'v' + newVersion]).on('close', () => {
        spawn('git', ['push']).on('close', () => {
            spawn('git', ['push', '--tags'])
        })
    });
});

function runTx(transifexCmd: string, resourceName: string): Promise<number> {
    return new Promise<number>(((resolve, reject) => {
        spawn(transifexCmd, ['pull', '--parallel', '-a', '-r', resourceName, '--minimum-perc', '70']).on('exit', (code: number) => {
            if (code !== 0) {
                reject(new Error(`Transifex failed to download locales and exited with code: ${code}`));
            }
            resolve(code);
        });
    }));
}


