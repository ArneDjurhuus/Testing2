package com.example.pixel10app.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

val Context.tasksDataStore: DataStore<Preferences> by preferencesDataStore(name = "tasks")

@Serializable
data class TaskEntity(val id: Int, val title: String, val done: Boolean = false)

class TaskRepository(private val context: Context) {

    companion object {
        private val TASKS_KEY = stringPreferencesKey("tasks_json")
        private val json = Json { ignoreUnknownKeys = true }
    }

    val tasks: Flow<List<TaskEntity>> = context.tasksDataStore.data.map { prefs ->
        val raw = prefs[TASKS_KEY] ?: return@map defaultTasks()
        runCatching { json.decodeFromString<List<TaskEntity>>(raw) }.getOrElse { defaultTasks() }
    }

    suspend fun saveTasks(tasks: List<TaskEntity>) {
        context.tasksDataStore.edit { prefs ->
            prefs[TASKS_KEY] = json.encodeToString(tasks)
        }
    }

    private fun defaultTasks() = listOf(
        TaskEntity(1, "Morning run"),
        TaskEntity(2, "Check emails"),
        TaskEntity(3, "Team standup"),
        TaskEntity(4, "Review pull requests"),
        TaskEntity(5, "Lunch break"),
    )
}
