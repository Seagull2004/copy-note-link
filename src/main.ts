import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab} from "./settings";

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere 
		this.addCommand({
			id: 'copy-current-file-link',
			name: 'Copy current file link',
			hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'c' }],
			callback: async () => {
				const filePath = this.app.workspace.getActiveFile()?.basename
				let output = "[[" + filePath
				if (this.settings.previewPreference){
					output = "!" + output
				}
				if (this.settings.headingSupport) {
					output += "#"
				} else {
					output += "]]"
				}
				await navigator.clipboard.writeText(output)
				new Notice("📒 copied: " + output);
			}
		});
	
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
