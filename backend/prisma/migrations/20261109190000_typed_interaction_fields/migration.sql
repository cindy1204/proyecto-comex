ALTER TABLE "interacciones"
ADD COLUMN "fecha_tramite" DATE,
ADD COLUMN "valor_total_dolares" DECIMAL(20, 2);

UPDATE "interacciones"
SET "fecha_tramite" = CASE
  WHEN "data" ->> 'fechaTramite' ~ '^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
    AND to_char(to_date("data" ->> 'fechaTramite', 'FXYYYY-MM-DD'), 'YYYY-MM-DD') = "data" ->> 'fechaTramite'
  THEN to_date("data" ->> 'fechaTramite', 'FXYYYY-MM-DD')
  ELSE NULL
END,
"valor_total_dolares" = CASE
  WHEN "data" ->> 'valorTotalDolares' ~ '^[0-9]{1,18}(\.[0-9]{1,2})?$'
  THEN ("data" ->> 'valorTotalDolares')::DECIMAL(20, 2)
  ELSE NULL
END;
