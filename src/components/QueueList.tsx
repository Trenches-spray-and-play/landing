"use client";

import styles from './QueueList.module.css';
import { Participant } from '@/lib/mockData';
import Countdown from './Countdown';

interface QueueListProps {
    participants: Participant[];
    onBoost?: (id: string) => void;
}

export default function QueueList({ participants, onBoost }: QueueListProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>LIVE QUEUE ({participants.length})</h3>

            <div className={styles.list}>
                {participants.map((p, index) => (
                    <div key={p.id} className={`${styles.item} ${styles[p.status]}`}>
                        <div className={styles.rank}>
                            <span className={styles.rankNumber}>#{index + 1}</span>
                            <span className={styles.statusIndicator}></span>
                        </div>

                        <div className={styles.info}>
                            <span className={styles.handle}>
                                {p.handle}
                                {p.handle === '@you' && <span className={styles.youTag}> (YOU)</span>}
                            </span>
                            <div className={styles.metaRow}>
                                <span className={styles.time}>{p.timeAgo}</span>
                                {p.isTurn && <span className={styles.turnLabel}>ON THE CLOCK</span>}
                            </div>
                        </div>

                        {p.isTurn && <Countdown initialMinutes={15} />}

                        <div className={styles.stats}>
                            <span className={styles.score}>B: {p.beliefScore}</span>
                            <span className={styles.amount}>{p.entryAmount} $BLT</span>
                            {p.handle === '@you' && onBoost && (
                                <button className={styles.boostBtn} onClick={() => onBoost(p.id)}>
                                    ⚡ BOOST
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
