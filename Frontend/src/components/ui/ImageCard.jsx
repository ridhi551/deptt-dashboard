/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, text, link, buttonText }) => {
  const navigate = useNavigate();
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} borderRadius="lg" className="size-64 md:size-96" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{text}</Heading>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup
          spacing="2"
          _expanded={true}
          className="flex items-center justify-center w-full"
        >
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              navigate(link);
            }}
          >
            {buttonText}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
