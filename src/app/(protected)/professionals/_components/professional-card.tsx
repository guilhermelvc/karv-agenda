"use client";

import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteProfessional } from "@/actions/delete-professional";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { professionalsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvailability } from "../_helpers/availability";
import UpsertProfessionalForm from "./upsert-professional-form";

interface ProfessionalCardProps {
  professional: typeof professionalsTable.$inferSelect;
}

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const [isUpsertProfessionalDialogOpen, setIsUpsertProfessionalDialogOpen] =
    useState(false);
  const deleteProfessionalAction = useAction(deleteProfessional, {
    onSuccess: () => {
      toast.success("Profissional deletado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar Profissional.");
    },
  });
  const handleDeleteProfessionalClick = () => {
    if (!professional) return;
    deleteProfessionalAction.execute({ id: professional.id });
  };

  const professionalInitials = professional.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  const availability = getAvailability(professional);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{professionalInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{professional.name}</h3>
            <p className="text-muted-foreground text-sm">
              {professional.specialty}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} a {availability.to.format("dddd")}
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} as{" "}
          {availability.to.format("HH:mm")}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(professional.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <Dialog
          open={isUpsertProfessionalDialogOpen}
          onOpenChange={setIsUpsertProfessionalDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertProfessionalForm
            professional={{
              ...professional,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
            onSuccess={() => setIsUpsertProfessionalDialogOpen(false)}
            isOpen={isUpsertProfessionalDialogOpen}
          />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <TrashIcon />
              Deletar profissional
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar esse profissional?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser revertida. Isso irá deletar o
                profissional e todas as consultas agendadas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProfessionalClick}>
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ProfessionalCard;
