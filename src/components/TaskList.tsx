"use client";

import { useState } from 'react';
import styles from './TaskList.module.css';
import { Task } from '@/lib/mockData';

interface TaskListProps {
    initialTasks: Task[];
    onTaskComplete: (score: number) => void;
}

export default function TaskList({ initialTasks, onTaskComplete }: TaskListProps) {
    const [tasks, setTasks] = useState(initialTasks);

    const handleComplete = (taskId: string, reward: number) => {
        // Optimistic update
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status: 'completed' } : t
        ));
        onTaskComplete(reward);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>CONTRIBUTION TASKS</h3>
            <div className={styles.list}>
                {tasks.map(task => (
                    <div key={task.id} className={`${styles.item} ${styles[task.status]}`}>
                        <div className={styles.info}>
                            <span className={styles.taskTitle}>{task.title}</span>
                            <span className={styles.reward}>+{task.reward} BELIEF</span>
                        </div>
                        {task.status === 'pending' ? (
                            <button
                                className={styles.actionBtn}
                                onClick={() => handleComplete(task.id, task.reward)}
                            >
                                VERIFY
                            </button>
                        ) : (
                            <span className={styles.completedIcon}>✓</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
