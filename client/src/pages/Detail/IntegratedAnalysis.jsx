/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { ShowGraph } from "./ShowGraph";

const integrateAreaWrapper = css`
    h3 {
        color: rgba(255, 255, 255, 0.8);
        font-size: 2.3rem;
        font-weight: bold;
    }
`;

function IntegratedAnalysis({ movie }) {
    return (
        <div id="integrateArea" css={integrateAreaWrapper}>
            <h3>통합 분석</h3>
            <ShowGraph noreviewarr={movie.noreviewarr} />
        </div>
    );
}

export default IntegratedAnalysis;
