import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange, size }) {
  // Default size if no custom size is provided
  const defaultSize = "w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6";

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-1 sm:p-2 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`${size || defaultSize} ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
