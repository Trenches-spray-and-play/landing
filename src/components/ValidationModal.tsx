"use client";

import { useState } from 'react';
import styles from './ValidationModal.module.css';
import { MOCK_PEER_POSTS } from '@/lib/mockData';

interface ValidationModalProps {
    isOpen: boolean;
    onComplete: () => void;
}

const VIEW_RANGES = ['<100', '100-500', '500-1k', '1k-5k', '5k+'] as const;
type Platform = 'X' | 'Farcaster' | 'Telegram';

export default function ValidationModal({ isOpen, onComplete }: ValidationModalProps) {
    const [step, setStep] = useState<'create' | 'submit-links' | 'validate'>('create');
    const [currentPostIndex, setCurrentPostIndex] = useState(0);

    // Post submission state
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
    const [postLinks, setPostLinks] = useState<Record<Platform, string>>({
        'X': '',
        'Farcaster': '',
        'Telegram': ''
    });

    // Validation state
    const [rating, setRating] = useState(0);
    const [viewRange, setViewRange] = useState('');
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [engagementProofLinks, setEngagementProofLinks] = useState<string[]>(['']);

    if (!isOpen) return null;

    const togglePlatform = (platform: Platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    const handlePostLinkChange = (platform: Platform, value: string) => {
        setPostLinks(prev => ({ ...prev, [platform]: value }));
    };

    const handleProceedToValidation = () => {
        // Validate at least one link submitted
        const hasValidLink = selectedPlatforms.some(p => postLinks[p].trim() !== '');
        if (!hasValidLink) {
            alert('Please submit at least one post link');
            return;
        }
        setStep('validate');
    };

    const addProofLink = () => {
        setEngagementProofLinks(prev => [...prev, '']);
    };

    const updateProofLink = (index: number, value: string) => {
        setEngagementProofLinks(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const handleNextPost = () => {
        // Award Boost Points to validator (mock)
        console.log('Validator earns +50 Boost Points');

        // Award Belief Score to post author based on rating (mock)
        const beliefEarned = rating === 5 ? 20 : rating === 4 ? 15 : rating === 3 ? 10 : rating === 2 ? 5 : 0;
        console.log(`Post author earns +${beliefEarned} Belief Score`);

        // Reset form
        setRating(0);
        setViewRange('');
        setLiked(false);
        setCommented(false);
        setEngagementProofLinks(['']);

        if (currentPostIndex < MOCK_PEER_POSTS.length - 1) {
            setCurrentPostIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const currentPost = MOCK_PEER_POSTS[currentPostIndex];
    const isValidationFormValid = rating > 0 && viewRange !== '';
    const needsProofLinks = (liked || commented) && engagementProofLinks.every(link => link.trim() === '');

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {step === 'create' && (
                    <>
                        <h2 className={styles.title}>MANDATORY ACTION: SOCIAL PROOF</h2>
                        <p className={styles.desc}>Post about this game on your platform(s) to finalize your entry.</p>

                        <div className={styles.platformSelection}>
                            <p className={styles.sectionLabel}>SELECT PLATFORM(S):</p>
                            {(['X', 'Farcaster', 'Telegram'] as Platform[]).map(platform => (
                                <label key={platform} className={styles.platformCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={selectedPlatforms.includes(platform)}
                                        onChange={() => togglePlatform(platform)}
                                    />
                                    <span>{platform === 'X' ? 'X (Twitter)' : platform}</span>
                                </label>
                            ))}
                        </div>

                        <div className={styles.mockPostArea}>
                            <textarea
                                className={styles.textarea}
                                placeholder="I just sprayed into the Rapid Trench..."
                                readOnly
                                value="Joining the #Trenches! Just sprayed $BLT. Who's with me? 🚀"
                            />
                            <div className={styles.postButtons}>
                                {selectedPlatforms.map(platform => (
                                    <button
                                        key={platform}
                                        className={styles.postBtn}
                                        onClick={() => {
                                            // Mock posting action
                                            alert(`Opening ${platform} to post...`);
                                        }}
                                    >
                                        POST TO {platform.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={styles.continueBtn}
                            onClick={() => setStep('submit-links')}
                            disabled={selectedPlatforms.length === 0}
                        >
                            CONTINUE TO LINK SUBMISSION →
                        </button>
                    </>
                )}

                {step === 'submit-links' && (
                    <>
                        <h2 className={styles.title}>SUBMIT POST LINK(S)</h2>
                        <p className={styles.desc}>After posting, submit your link(s) below:</p>

                        <div className={styles.linkSubmission}>
                            {selectedPlatforms.map(platform => (
                                <div key={platform} className={styles.linkField}>
                                    <label>{platform} Post URL:</label>
                                    <input
                                        type="url"
                                        className={styles.linkInput}
                                        placeholder={`https://${platform.toLowerCase()}.com/...`}
                                        value={postLinks[platform]}
                                        onChange={(e) => handlePostLinkChange(platform, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.continueBtn}
                            onClick={handleProceedToValidation}
                        >
                            CONTINUE TO VALIDATION →
                        </button>
                    </>
                )}

                {step === 'validate' && (
                    <>
                        <h2 className={styles.title}>VALIDATE PEERS ({currentPostIndex + 1}/{MOCK_PEER_POSTS.length})</h2>
                        <p className={styles.desc}>Review peer posts to earn <span className={styles.highlight}>+50 Boost Points</span> per validation.</p>

                        <div className={styles.peerPost}>
                            <div className={styles.postHeader}>
                                <span className={styles.author}>{currentPost.author}</span>
                                <span className={styles.platform}>{currentPost.platform}</span>
                            </div>
                            <p className={styles.content}>{currentPost.content}</p>
                            <a href="#" className={styles.viewPost} target="_blank">VIEW ORIGINAL POST →</a>
                        </div>

                        <div className={styles.form}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>
                                    <span className={styles.labelText}>POST QUALITY RATING</span>
                                    <span className={styles.labelHint}>How would you rate the quality of this post?</span>
                                </label>
                                <div className={styles.rating}>
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <button
                                            key={n}
                                            className={`${styles.rateBtn} ${rating === n ? styles.active : ''}`}
                                            onClick={() => setRating(n)}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>
                                    <span className={styles.labelText}>ESTIMATED VIEWS</span>
                                    <span className={styles.labelHint}>Approximately how many views did this post get?</span>
                                </label>
                                <select
                                    className={styles.select}
                                    value={viewRange}
                                    onChange={(e) => setViewRange(e.target.value)}
                                >
                                    <option value="">Select Range</option>
                                    {VIEW_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>

                            <div className={styles.engagementSection}>
                                <p className={styles.sectionLabel}>ENGAGEMENT PROOF (Optional)</p>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={liked}
                                            onChange={(e) => setLiked(e.target.checked)}
                                        />
                                        <span>I liked this post</span>
                                    </label>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={commented}
                                            onChange={(e) => setCommented(e.target.checked)}
                                        />
                                        <span>I commented on this post</span>
                                    </label>
                                </div>

                                {(liked || commented) && (
                                    <div className={styles.proofLinks}>
                                        <p className={styles.proofHint}>Submit link(s) to your comment/like as proof:</p>
                                        {engagementProofLinks.map((link, idx) => (
                                            <input
                                                key={idx}
                                                type="url"
                                                className={styles.proofInput}
                                                placeholder="https://..."
                                                value={link}
                                                onChange={(e) => updateProofLink(idx, e.target.value)}
                                            />
                                        ))}
                                        <button className={styles.addLinkBtn} onClick={addProofLink}>
                                            + ADD ANOTHER LINK
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                className={styles.submitBtn}
                                disabled={!isValidationFormValid || needsProofLinks}
                                onClick={handleNextPost}
                            >
                                VALIDATE & NEXT →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
