package com.example.pixel10app.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

val Context.settingsDataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

class SettingsRepository(private val context: Context) {

    companion object {
        val NOTIFICATIONS_ENABLED = booleanPreferencesKey("notifications_enabled")
        val DARK_MODE_ENABLED = booleanPreferencesKey("dark_mode_enabled")
        val DYNAMIC_COLOR_ENABLED = booleanPreferencesKey("dynamic_color_enabled")
    }

    val notificationsEnabled: Flow<Boolean> = context.settingsDataStore.data
        .map { prefs -> prefs[NOTIFICATIONS_ENABLED] ?: true }

    val darkModeEnabled: Flow<Boolean> = context.settingsDataStore.data
        .map { prefs -> prefs[DARK_MODE_ENABLED] ?: false }

    val dynamicColorEnabled: Flow<Boolean> = context.settingsDataStore.data
        .map { prefs -> prefs[DYNAMIC_COLOR_ENABLED] ?: true }

    suspend fun setNotificationsEnabled(enabled: Boolean) {
        context.settingsDataStore.edit { prefs -> prefs[NOTIFICATIONS_ENABLED] = enabled }
    }

    suspend fun setDarkModeEnabled(enabled: Boolean) {
        context.settingsDataStore.edit { prefs -> prefs[DARK_MODE_ENABLED] = enabled }
    }

    suspend fun setDynamicColorEnabled(enabled: Boolean) {
        context.settingsDataStore.edit { prefs -> prefs[DYNAMIC_COLOR_ENABLED] = enabled }
    }
}
