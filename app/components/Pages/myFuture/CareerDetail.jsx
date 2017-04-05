import React, { PropTypes } from "react";
import { Grid } from "semantic-ui-react";

/**
*
*/
const CareerDetail = (props) => {
    const { title, description /*, videoCode, videoThumbnail*/ } = props;
    return (
        <Grid>
            <Grid.Row >
                <Grid.Column className="myFutureHeader" width={16} >
                    <h1>{title}</h1>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className="myFutureDescRow">
                <Grid.Column className="myFutureDescCol" width={16}>
                    <p>
                        {description}
                    </p>
                </Grid.Column>
                {/*<Grid.Column width={6}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Embed
                                id={videoCode}
                                placeholder={videoThumbnail}
                                source='youtube'
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid.Column>*/}
            </Grid.Row>
        </Grid>
    );
};

export default CareerDetail;


CareerDetail.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    videoCode: PropTypes.string,
    videoThumbnail: PropTypes.string
};
