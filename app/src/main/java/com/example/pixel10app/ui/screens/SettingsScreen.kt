package com.example.pixel10app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.pixel10app.data.SettingsRepository
import kotlinx.coroutines.launch

@Composable
fun SettingsScreen(modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val repository = remember { SettingsRepository(context) }
    val scope = rememberCoroutineScope()

    val notificationsEnabled by repository.notificationsEnabled.collectAsState(initial = true)
    val darkModeEnabled by repository.darkModeEnabled.collectAsState(initial = false)
    val dynamicColorEnabled by repository.dynamicColorEnabled.collectAsState(initial = true)

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "Settings",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        SettingsSection(title = "Appearance") {
            SettingsToggleRow(
                title = "Dark Mode",
                subtitle = "Use dark color scheme",
                checked = darkModeEnabled,
                onCheckedChange = { scope.launch { repository.setDarkModeEnabled(it) } }
            )
            HorizontalDivider()
            SettingsToggleRow(
                title = "Dynamic Color",
                subtitle = "Use wallpaper-based colors (Android 12+)",
                checked = dynamicColorEnabled,
                onCheckedChange = { scope.launch { repository.setDynamicColorEnabled(it) } }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        SettingsSection(title = "Notifications") {
            SettingsToggleRow(
                title = "Enable Notifications",
                subtitle = "Receive task reminders",
                checked = notificationsEnabled,
                onCheckedChange = { scope.launch { repository.setNotificationsEnabled(it) } }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        SettingsSection(title = "About") {
            ListItem(
                headlineContent = { Text("App Version") },
                supportingContent = { Text("1.0.0") }
            )
            HorizontalDivider()
            ListItem(
                headlineContent = { Text("Device") },
                supportingContent = { Text("Google Pixel 10 Pro") }
            )
        }
    }
}

@Composable
fun SettingsSection(title: String, content: @Composable ColumnScope.() -> Unit) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(bottom = 4.dp)
    )
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column { content() }
    }
}

@Composable
fun SettingsToggleRow(
    title: String,
    subtitle: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    ListItem(
        headlineContent = { Text(title) },
        supportingContent = { Text(subtitle) },
        trailingContent = {
            Switch(
                checked = checked,
                onCheckedChange = onCheckedChange
            )
        }
    )
}

