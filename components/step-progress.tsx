import styles from './step-progress.module.css'
import cn from 'classnames'

export default function TaskProgress() {
	const steps = [ 
		'Starting',
		'Waiting',
		'Loggin',
		'Waiting',
		'Buying'
	]
	
	let progress = 3
  return (
	  <>
	<div style={{
		display:'flex',
		justifyContent:'center',
		margin: '1rem 1rem'
	}}>
		<div className={styles["mainWrapper"]}>
		<div className={styles["statusBar"]}>
		<span id="pBar" className={styles['pBar']} />
		{steps.map( (step, i) => {
			return (
			<div id={`node${i}`} className={cn(styles['node'], {
				[styles['done']]: i < progress
			})}
			>
				<div className={styles['main']}></div>
				<span className={styles['text']}>{step}</span>
			</div>)
		})}
			</div>

		</div>
		
	</div>
	<br />
	<br />
	<div>
		<a className="button" onClick={()=> {}}>Next</a>
	</div>
	</>
  )
}