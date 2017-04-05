import React, { PropTypes } from "react";
import { Grid, Embed} from "semantic-ui-react";

const CareerDetail = (props) => {
    const { title, description, videoLink } = props;
    
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <h1>{title}</h1>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={10}>
                    <p>
                        {description}
                    </p>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Embed
                                id={videoLink}
                                placeholder={videoLink}
                                source='youtube'
                            /> 
                        </Grid.Column>
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default CareerDetail;


CareerDetail.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    videoLink: PropTypes.string
};