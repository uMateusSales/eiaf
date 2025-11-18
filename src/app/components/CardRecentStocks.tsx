import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface CardStockProps {
  stock: string;
  date: string;
}

export function CardRecentStock({ stock, date }: CardStockProps) {
  return (
    <Card
      className="
        rounded-2xl 
        border border-neutral-200
        bg-white
        shadow-md
        hover:shadow-lg
        transition-shadow
      "
    >
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-semibold text-green-800 tracking-tight">
          {stock}
        </CardTitle>

        <CardDescription className="text-neutral-700 mt-2 text-[1rem]">
          Ultimo lançamento : {date}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
