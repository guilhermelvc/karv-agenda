import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { professionalsTable } from "@/db/schema";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import AddProfessionalButton from "./_components/add-professional-button";
import ProfessionalCard from "./_components/professional-card";

const ProfessionalsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const professionals = await db.query.professionalsTable.findMany({
    where: eq(professionalsTable.clinicId, session!.user.clinic!.id),
  });
  return (
    <WithAuthentication mustHaveClinic mustHavePlan>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Profissionais</PageTitle>
            <PageDescription>
              Gerencie os profissionais da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddProfessionalButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          <div className="grid grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default ProfessionalsPage;
