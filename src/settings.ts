import {App, PluginSettingTab, Setting} from "obsidian";
import CopyNoteLinkPlugin from "./main";

export interface MyPluginSettings {
	previewPreference: boolean;
	headingSupport: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	previewPreference: false,
	headingSupport: true
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: CopyNoteLinkPlugin;

	constructor(app: App, plugin: CopyNoteLinkPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Link with preview')
			.setDesc('Choose if you want or not the \'!\' in the clipboard link')
			.addToggle( choise => choise
				.setValue(this.plugin.settings.previewPreference)
				.onChange(async (value) => {
					this.plugin.settings.previewPreference = value;
					await this.plugin.saveSettings();
				})
			)

		new Setting(containerEl)
			.setName('Link with heading support')
			.setDesc('Disable this if you want no \'#\' in the end of a link')
			.addToggle( choise => choise
				.setValue(this.plugin.settings.headingSupport)
				.onChange(async (value) => {
					this.plugin.settings.headingSupport = value;
					await this.plugin.saveSettings();
				})
			)
	}
}
