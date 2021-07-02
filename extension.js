// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

async function runTerminalCommand(command) {
	const terminals = vscode.window.terminals;
	if (!terminals.length) {
		//console.log('Nenhum terminal aberto');
		let terminal = await vscode.window.createTerminal(`Jovo CLI Extension`);
		terminal.show();
		terminal.sendText(`${command}`)
	} else {
		terminals.map((a) => {
			//console.log('Terminal já aberto');
			if (a.name == 'Jovo CLI Extension') {
				a.show();
				a.sendText(`${command}`)
				return true;
			} else {
				a.show();
				a.sendText(`${command}`)
			}
		})
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "jovo-utility" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('jovo-utility.helloWorld', function () {
	// 	//vscode.window.showInformationMessage('Hello World from Jovo Utility!');

	// 	createStatusBarIcons();

	// });

	let installCLI = vscode.commands.registerCommand('jovo-utility.install', async function () {

		const preferences = await vscode.window.showInformationMessage(
			"Which manager do you want to use?",
			"NPM",
			"Yarn",
		);
		if (preferences === "NPM") {

			await runTerminalCommand(`npm install -g jovo-cli`);

		} else {

			await runTerminalCommand(`yarn global add jovo-cli`);
		}
		if (preferences == null) return;
	});

	let newProject = vscode.commands.registerCommand('jovo-utility.new-project', async function () {

		const input = await vscode.window.showInputBox({ prompt: 'Enter a name of project:' });

		vscode.window.showInformationMessage(`Creating project: ${input}`);

		await runTerminalCommand(`jovo new ${input}`);

	});

	let version = vscode.commands.registerCommand('jovo-utility.version', async function () {

		await runTerminalCommand('jovo -v');

	});

	let buildAlexa = vscode.commands.registerCommand('jovo-utility.build-alexa', async function () {

		//vscode.window.showInformationMessage('Executing');

		await runTerminalCommand(`jovo build --platform alexaSkill`);

	});

	let buildGoogle = vscode.commands.registerCommand('jovo-utility.build-google', async function () {

		await runTerminalCommand('jovo build --platform googleAction');

	});

	let deployAlexa = vscode.commands.registerCommand('jovo-utility.deploy-alexa', async function () {

		await runTerminalCommand('jovo deploy --platform alexaSkill');

	});

	let deployGoogle = vscode.commands.registerCommand('jovo-utility.deploy-google', async function () {

		await runTerminalCommand('jovo deploy --platform googleAction');

	});

	let deployZip = vscode.commands.registerCommand('jovo-utility.deploy-target-zip', async function () {

		await runTerminalCommand('jovo deploy --target zip');

	});

	let runLocal = vscode.commands.registerCommand('jovo-utility.run', async function () {

		await runTerminalCommand(`jovo run -w`);

	});

	let askConfigure = vscode.commands.registerCommand('jovo-utility.ask-configure', async function () {

		await runTerminalCommand('ask configure');

	});

	context.subscriptions.push(installCLI, newProject, version, buildAlexa, buildGoogle, deployAlexa, deployGoogle, deployZip, runLocal, askConfigure);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
