import React, {Component} from 'react';
import BasicStatistics from "./Components/BasicStatistics";
import './css/index.sass'
class DistributionStatistics extends Component {
	
	
	render() {
		return (
			<div>
				<BasicStatistics {...this.props} />
			</div>
		);
	}
}

export default DistributionStatistics;
