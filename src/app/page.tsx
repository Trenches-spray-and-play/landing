"use client";

import styles from "./page.module.css";
import TrenchCard from "@/components/TrenchCard";
import ActivityTicker from "@/components/ActivityTicker";

import { MOCK_TRENCHES } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleTrenchClick = (level: string) => {
    router.push(`/trench/${level}`);
  };

  return (
    <main className={styles.container}>
      <ActivityTicker />
      <header className={styles.header}>
        <h1 className={styles.logo}>TRENCHES__</h1>
        <p className={styles.tagline}>SPRAY & PRAY // NON-CUSTODIAL</p>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Active Campaigns</h2>
        <div className={styles.grid}>
          {Object.values(MOCK_TRENCHES).map((trench) => (
            <TrenchCard
              key={trench.id}
              level={trench.level}
              entrySize={trench.entrySize}
              roiCap={trench.roiCap}
              cadence={trench.cadence}
              reserves={trench.reserves}
              onClick={() => handleTrenchClick(trench.level)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
