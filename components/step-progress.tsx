import styles from './step-progress.module.css'
import cn from 'classnames'
import { useState } from 'react'

type Props = {
	steps: string[]
	progress: number
}

export default function StepProgress({steps, progress}:Props) {
	let totalSteps = steps.length
  return (
	  <>
	<div style={{
		display:'flex',
		justifyContent:'center',
		margin: '1rem 1rem'
	}}>
		<div className={styles["mainWrapper"]}>
		<div className={styles["statusBar"]}>
		<span id="pBar" className={styles['pBar']}
		style={{width:`${100/(totalSteps-1) * (progress)}%`}}
		/>
		{steps.map( (step, i) => {
			return (
			<div key={`node${i}`} id={`node${i}`} className={cn(styles['node'], {
				[styles['done']]: i <= progress
			})}
			>
				<div className={cn(styles['main'],{
					[styles['done']]: i <= progress,
					[styles['now']]: i == progress

				})}></div>
				<span className={cn(styles['text'], {
					[styles['done']]: i <= progress,
				})}>{step}</span>
			</div>)
		})}
			</div>
		</div>
	</div>
	</>
  )
}