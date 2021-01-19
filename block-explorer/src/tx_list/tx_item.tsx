import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Text, contentStyle, contentHighlightStyle, DeviceWidth } from '../components';
import chevronRightIcon from '../images/chevron_right.svg';
import { ProofId, proofIdToType, ProofTypeTag } from '../proof_type';
import { spacings, fontSizes, lineHeights, breakpoints } from '../styles';

export interface Tx {
  id: string;
  proofId: ProofId;
}

const itemRootStyle = css`
  ${contentStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacings.xs} ${spacings.s};
`;

const Root = styled(Link)`
  ${itemRootStyle}
  font-size: ${fontSizes.s};
  line-height: ${lineHeights.s};

  &:hover {
    ${contentHighlightStyle}
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.xs}) {
    flex-wrap: wrap;
  }
`;

const blockElemStyle = css`
  margin: ${spacings.xs} ${spacings.xxs};
`;

const StyledProofTypeTag = styled(ProofTypeTag)`
  ${blockElemStyle}
  margin-right: ${spacings.xxl};
  min-width: 110px;

  @media (max-width: ${breakpoints.s}) {
    margin-right: ${spacings.l};
  }
`;

const Hash = styled(Text)`
  ${blockElemStyle}
  @media (max-width: ${breakpoints.xs}) {
    width: 100%;
  }
`;

const ChevronRight = styled.img`
  ${blockElemStyle}
  width: 24px;
  height: 24px;
`;

interface TxItemProps {
  tx: Tx;
}

export const TxItem: React.FunctionComponent<TxItemProps> = ({ tx: { id, proofId } }) => {
  const proofType = proofIdToType(proofId);
  return (
    <Root to={`/tx/${id}`}>
      <Info>
        <StyledProofTypeTag proofType={proofType} />
        <DeviceWidth>
          {({ breakpoint }) => {
            let hash = id;
            if (breakpoint === 'm') {
              hash = `${id.slice(0, 40)}...${id.slice(-6)}`;
            } else if (breakpoint === 's') {
              hash = `${id.slice(0, 24)}...${id.slice(-6)}`;
            } else if (breakpoint === 'xs') {
              hash = `${id.slice(0, 8)}...${id.slice(-6)}`;
            }
            return <Hash text={`0x${hash}`} weight="light" color="white" monospace />;
          }}
        </DeviceWidth>
      </Info>
      <ChevronRight src={chevronRightIcon} />
    </Root>
  );
};
