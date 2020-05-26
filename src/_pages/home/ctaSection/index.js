import React from 'react';
import {
  Container,
  TriangleOverlay,
  Check,
  CheckImg,
  Comment,
  CommentTitle,
  CommentContent,
} from './styledComponents';

export const CTASection = () => {
  return (
    <Container>
      <TriangleOverlay />
      <Check>
        <CheckImg />
      </Check>
      <Comment>
        <CommentTitle>Verified and secured tickets everytime</CommentTitle>
        <CommentContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CommentContent>
      </Comment>
    </Container>
  );
};
