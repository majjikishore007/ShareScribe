SELECT 
"shareNote"."permission" AS "shareNote_permission",
"shareNote"."id" AS "shareNote_id",
"note"."id" AS "note_id",
"note"."title" AS "note_title",
"note"."content" AS "note_content",
"note"."createdAt" AS "note_createdAt",
"note"."updatedAt" AS "note_updatedAt",
"note"."userId" AS "note_userId",
"note"."title" AS "note_title",
         "note"."content" AS "note_content",
          "note"."createdAt" AS "note_createdAt",
           "note"."updatedAt" AS "note_updatedAt",
            .id, "note"."userId",
             "note"."title", 
             "note"."content",
              "note"."createdAt",
               "note"."updatedAt" 
               FROM "shared_note" "shareNote" 
               LEFT JOIN "note" "note" ON "note"."id"="shareNote"."noteId"
                WHERE "note"."id" = $1 AND "note"."userId" = $2 OR "shareNote"."toUserId" = $2