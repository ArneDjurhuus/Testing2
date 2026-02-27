package com.example.pixel10app

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import com.example.pixel10app.data.TaskEntity

class TaskTest {
    @Test
    fun task_defaultsToNotDone() {
        val task = TaskEntity(id = 1, title = "Test task")
        assertFalse(task.done)
    }

    @Test
    fun task_copyTogglesDone() {
        val task = TaskEntity(id = 1, title = "Test task", done = false)
        val toggled = task.copy(done = !task.done)
        assertTrue(toggled.done)
    }

    @Test
    fun task_titleIsPreserved() {
        val title = "Buy groceries"
        val task = TaskEntity(id = 2, title = title)
        assertEquals(title, task.title)
    }
}
