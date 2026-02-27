package com.example.pixel10app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.RadioButtonUnchecked
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.pixel10app.data.TaskEntity
import com.example.pixel10app.data.TaskRepository
import kotlinx.coroutines.launch

@Composable
fun HomeScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val repository = remember { TaskRepository(context) }
    val scope = rememberCoroutineScope()

    val tasks by repository.tasks.collectAsState(initial = emptyList())
    var newTaskText by remember { mutableStateOf("") }

    fun saveTasks(updated: List<TaskEntity>) {
        scope.launch { repository.saveTasks(updated) }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "My Tasks",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = newTaskText,
                onValueChange = { newTaskText = it },
                label = { Text("New task") },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(
                onClick = {
                    if (newTaskText.isNotBlank()) {
                        val nextId = (tasks.maxOfOrNull { it.id } ?: 0) + 1
                        saveTasks(tasks + TaskEntity(nextId, newTaskText.trim()))
                        newTaskText = ""
                    }
                }
            ) {
                Text("Add")
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(tasks, key = { it.id }) { task ->
                TaskItem(
                    task = task,
                    onToggle = { toggled ->
                        saveTasks(tasks.map { if (it.id == toggled.id) it.copy(done = !it.done) else it })
                    },
                    onDelete = { deleted ->
                        saveTasks(tasks.filter { it.id != deleted.id })
                    }
                )
            }
        }
    }
}

@Composable
fun TaskItem(
    task: TaskEntity,
    onToggle: (TaskEntity) -> Unit,
    onDelete: (TaskEntity) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { onToggle(task) }) {
                Icon(
                    imageVector = if (task.done) Icons.Filled.CheckCircle else Icons.Filled.RadioButtonUnchecked,
                    contentDescription = if (task.done) "Mark incomplete" else "Mark complete",
                    tint = if (task.done) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
                )
            }
            Text(
                text = task.title,
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.weight(1f),
                color = if (task.done) MaterialTheme.colorScheme.outline else MaterialTheme.colorScheme.onSurface
            )
            TextButton(onClick = { onDelete(task) }) {
                Text("Delete", color = MaterialTheme.colorScheme.error)
            }
        }
    }
}

